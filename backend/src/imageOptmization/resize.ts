import sharp from "sharp";
import { ImageResize } from "../Interface/interface";


export default function resizeImage({ imagePath, height, width, resizedImagePath }: ImageResize) {
    return new Promise<string>((resolve, reject) => {
        const path = `${resizedImagePath}/resized-image-${Date.now()}.webp`
        sharp(imagePath)
            .resize(width, height)
            .toFile(path, (err, info) => {
                if(err){
                    console.log('Something went wrong!!',err)
                }else {
                    resolve(path)
                }
            });
    })
}


