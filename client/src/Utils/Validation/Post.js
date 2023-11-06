export const postValidation = ({files,caption}) =>{
    const error = {}
    if(files?.length < 1){
        return error.files = "Please select a file to proceed."
    }

    if(caption.length < 1 ) {
        return error.caption = "Please add a caption to continue"
    }

    return error
}