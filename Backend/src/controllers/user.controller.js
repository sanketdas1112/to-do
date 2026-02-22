import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) =>{
    // get user details from frontend

    const {username, fullName, email, password } = req.body
    // console.log("email", email)

    

    //validation - not empty

    // if(fullName == ""){
    //     throw new ApiError(400, "Full name is required")
    // }
     if(
        [fullName, email, username, password].some((field)=>{
            field?.trim() === ""
        })
    ){
        throw new ApiError(400, "All fields are required");
    }
    //check if user is already exists : by email, username

    const existedUser = User.findOne(
        {
            $or : [{username}, {email}]
        }
    )
    if(existedUser){
        throw new ApiError(409, "user already exists");
    }

    // if using multer to file upload
    /* 
    const avatarLocalPath = req.files?avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    */

    //create user object - create entry in db
    //remove password and refresh token from response
    const user = await User.create({
        username,
        fullName,
        email,
        password,
        username: username.toLowerCase()
    });
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

     // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong when registering the user");
    }

    //return response else error
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})


export {registerUser}