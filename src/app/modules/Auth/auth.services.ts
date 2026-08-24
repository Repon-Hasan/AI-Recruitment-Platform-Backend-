import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { IChangePasswordPayload, ILoginUserPayload, IRegisterPatientPayload, IRequestUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utlis/token";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utlis/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../../config/cloudnary.config";

const registerUser=async(payload:IRegisterPatientPayload, file?: Express.Multer.File)=>{

        const {name,email,password,role}=payload

          // ==========================================
  // 1. Upload Image
  // ==========================================

  let imageUrl: string | undefined;

  if (file) {

    const uploadedImage =
      await uploadFileToCloudinary(
        file.buffer,
        file.originalname
      );

    imageUrl =
      uploadedImage.secure_url;
  }
        const data=await auth.api.signUpEmail({
           body:{
            name,email,password,role,image: imageUrl
           }
        })
//console.log(data)
        if(!data.user){
        throw new AppError(status.BAD_REQUEST,"Failed to Register");
        }

        try {

    // Create CandidateProfile only for CANDIDATE
    if (data.user.role === Role.CANDIDATE) {
      await prisma.candidateProfile.create({
        data: {
          userId: data.user.id,
        },
      });
    }
            const accessToken=tokenUtils.getAccessToken({
                id:data.user.id,
                role:data.user.role,
                name:data.user.name,
                email:data.user.email,
                status:data.user.status,
                isDeleted:data.user.isDeleted,
                emailVerified:data.user.emailVerified
            });

            const refreshToken=tokenUtils.getRefreshToken({
                id:data.user.id,
                role:data.user.role,
                name:data.user.name,
                email:data.user.email,
                status:data.user.status,
                isDeleted:data.user.isDeleted,
                emailVerified:data.user.emailVerified
            });
            
            return{
                ...data,
                accessToken,
                refreshToken,
                data
            }

        } catch (error) {
            console.log("Transaction error",error);
            await prisma.user.delete({
                where:{
                    id:data.user.id
                }
            })
        }

}

const loginUser=async(payload:ILoginUserPayload)=>{
    const {email,password}=payload;

    const data=await auth.api.signInEmail({
        body:{
            email,password
        }
    })

    if(data.user.status === UserStatus.INACTIVE){
     throw new AppError(status.FORBIDDEN,"User is Forbidden");
    };
    if(data.user.isDeleted || data.user.status === UserStatus.SUSPENDED){
      throw new AppError(status.NOT_FOUND,"User not found")
    };
        const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    return{
        ...data,accessToken,refreshToken
    }

}

const getMe=async(user: IRequestUser)=>{
    //console.log(user)
    const isUserExist=await prisma.user.findUnique({
        where:{id:user.userId}
    })
       if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    return isUserExist;
}

const getNewToken=async(refreshToken:string,sessionToken:string)=>{
         const isSessionTokenExists=await prisma.session.findUnique({
            where:{
                token:sessionToken
            },
            include:{
                user:true
            }
         })
         if(!isSessionTokenExists){
            throw new AppError(status.UNAUTHORIZED,"Invalid session Token");
         }

     const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.REFRESH_TOKEN_SECRET)
    if(!verifiedRefreshToken.success && verifiedRefreshToken.error){
        throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
    }
    const data=verifiedRefreshToken.data as JwtPayload
        const newAccessToken = tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });
        const {token} = await prisma.session.update({
        where : {
            token : sessionToken
        },
        data : {
            token : sessionToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
            updatedAt: new Date(),
        }
    })

    return {
        accessToken : newAccessToken,
        refreshToken : newRefreshToken,
        sessionToken : token,
    }
}

const changePassword=async(payload : IChangePasswordPayload, sessionToken : string)=>{
              const session=await auth.api.getSession({
                headers:new Headers({
                        Authorization : `Bearer ${sessionToken}`
                })
              })

                if(!session){
        throw new AppError(status.UNAUTHORIZED, "Invalid session token");
    }

 const {currentPassword, newPassword} = payload;
    const result = await auth.api.changePassword({
        body :{
            currentPassword,
            newPassword,
            revokeOtherSessions: true,
        },
        headers : new Headers({
            Authorization : `Bearer ${sessionToken}`
        })
    })
     if(session.user.needPasswordChange){
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                needPasswordChange: false,
            }
        })
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });
    

    return {
        ...result,
        accessToken,
        refreshToken,
    }
}

const logoutUser = async (sessionToken : string) => {
    const result = await auth.api.signOut({
        headers : new Headers({
            Authorization : `Bearer ${sessionToken}`
        })
    })

    return result;
}

const verifyEmail = async (email : string, otp : string) => {

    const result = await auth.api.verifyEmailOTP({
        body:{
            email,
            otp,
        }
    })

    if(result.status && !result.user.emailVerified){
        await prisma.user.update({
            where : {
                email,
            },
            data : {
                emailVerified: true,
            }
        })
    }
}

const forgetPassword = async (email : string) => {
    const isUserExist = await prisma.user.findUnique({
        where : {
            email,
        }
    })

    if(!isUserExist){
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    if(!isUserExist.emailVerified){
        throw new AppError(status.BAD_REQUEST, "Email not verified");
    }

    if(isUserExist.isDeleted || isUserExist.status === UserStatus.SUSPENDED){
        throw new AppError(status.NOT_FOUND, "User not found"); 
    }

    await auth.api.requestPasswordResetEmailOTP({
        body:{
            email,
        }
    })
}


const resetPassword = async (email : string, otp : string, newPassword : string) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    if (!isUserExist.emailVerified) {
        throw new AppError(status.BAD_REQUEST, "Email not verified");
    }

    if (isUserExist.isDeleted || isUserExist.status === UserStatus.SUSPENDED) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }

    await auth.api.resetPasswordEmailOTP({
        body:{
            email,
            otp,
            password : newPassword,
        }
    })

    if (isUserExist.needPasswordChange) {
        await prisma.user.update({
            where: {
                id: isUserExist.id,
            },
            data: {
                needPasswordChange: false,
            }
        })
    }

    await prisma.session.deleteMany({
        where:{
            userId : isUserExist.id,
        }
    })
}

//Google Login
const googleLoginSuccess = async (session : Record<string, any>) =>{
    const isUserExists = await prisma.user.findUnique({
        where : {
            id : session.user.id,
        }
    })

    if(!isUserExists){
        await prisma.user.create({
            data : {
                id : session.user.id,
                name : session.user.name,
                email : session.user.email,
            }
        
        })
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
    });

    return {
        accessToken,
        refreshToken,
    }
}


// ==========================================
// Change User Status
// ==========================================

const changeUserStatus = async (
  userId: string,
  userStatus: UserStatus
) => {

  // ----------------------------------------
  // Validate status
  // ----------------------------------------

  if (
    !Object.values(UserStatus).includes(
      userStatus
    )
  ) {

    throw new AppError(
      status.BAD_REQUEST,
      "Invalid user status"
    );

  }


  // ----------------------------------------
  // Find user
  // ----------------------------------------

  const user = await prisma.user.findUnique({

    where: {
      id: userId,
    },

    select: {
      id: true,
      role: true,
      status: true,
      isDeleted: true,
    },

  });


  if (!user) {

    throw new AppError(
      status.NOT_FOUND,
      "User not found"
    );

  }


  if (user.isDeleted) {

    throw new AppError(
      status.BAD_REQUEST,
      "User has already been deleted"
    );

  }


  // ----------------------------------------
  // Update status
  // ----------------------------------------

  const updatedUser =
    await prisma.user.update({

      where: {
        id: userId,
      },

      data: {
        status: userStatus,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        image: true,
        updatedAt: true,
      },

    });


  return updatedUser;
};


// ==========================================
// Delete User
// ==========================================

const deleteUser = async (
  userId: string
) => {

  // ----------------------------------------
  // Find User
  // ----------------------------------------

  const user = await prisma.user.findUnique({

    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },

  });


  if (!user) {

    throw new AppError(
      status.NOT_FOUND,
      "User not found"
    );

  }


  // ----------------------------------------
  // Don't allow admin to delete himself
  // ----------------------------------------

  if (user.role === "ADMIN") {

    throw new AppError(
      status.FORBIDDEN,
      "Admin user cannot be deleted"
    );

  }


  // ----------------------------------------
  // Delete from Database
  // ----------------------------------------

  await prisma.$transaction(
    async (tx) => {

      // CandidateProfile
      await tx.candidateProfile.deleteMany({

        where: {
          userId,
        },

      });


      // Company
      await tx.company.deleteMany({

        where: {
          userId,
        },

      });


      // Sessions
      await tx.session.deleteMany({

        where: {
          userId,
        },

      });


      // Accounts
      await tx.account.deleteMany({

        where: {
          userId,
        },

      });


      // Finally delete User
      await tx.user.delete({

        where: {
          id: userId,
        },

      });

    }
  );


  // ----------------------------------------
  // Delete Cloudinary Image
  // ----------------------------------------

  if (user.image) {

    try {

      await deleteFileFromCloudinary(
        user.image
      );

    } catch (error) {

      console.error(
        "User deleted but Cloudinary image deletion failed:",
        error
      );

    }

  }


  return {

    id: user.id,

    name: user.name,

    email: user.email,

    message:
      "User and profile image deleted successfully",

  };
};

export const authServices={
    registerUser,loginUser,getMe,getNewToken,changePassword,logoutUser,verifyEmail,forgetPassword,resetPassword,googleLoginSuccess,changeUserStatus,deleteUser
}