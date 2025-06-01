
import imageDefault from '../../assets/imageDefault.png'
const Profile = ({dataProfile})=>{
    // console.log(image)

    return (<div className="flex items-center gap-2">

        <div>
            <h1 className="text-lg">{dataProfile.author.username}</h1>
            <p className="text-xs opacity-50">{new Date(dataProfile.createdAt).toDateString()}</p>
        </div>
        {(dataProfile.author.image !==null && dataProfile.author.image !=='')? (<img className="bg-sky-100 rounded-full w-14"
         src={dataProfile.author.image} alt="" />):(<img className="bg-sky-100 rounded-full w-14"
         src={imageDefault} alt="" />)}
    </div>)
}

export default Profile