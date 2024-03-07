import { uploadImage } from "../../utils/uploadImages/uploadImagesAbout";
export const About = () => {
  


  return (
    <>
    <input type="file" onChange={ event => uploadImage(event.target.files![0])}/>
    About
    
    </>
  )
}
export default About;