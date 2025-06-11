import imageDefault from "../../assets/imageDefault.png";
const Profile = ({ dataProfile }) => {
  // console.log(image)

  return (
    <div className="flex items-center gap-2">
      <div>
        <h1 className="md:text-lg text-md text-gray-500">{dataProfile.author.username}</h1>
        <p className="text-xs opacity-50">
          {new Date(dataProfile.createdAt).toDateString()}
        </p>
      </div>
      {dataProfile.author.image !== null && dataProfile.author.image !== "" ? (
        <img
          className="bg-sky-100 rounded-full md:w-14 md:h-14 w-11 h-11"
          src={dataProfile.author.image}
          alt=""
        />
      ) : (
        <img
          className="bg-sky-100 rounded-full w-14 h-14"
          src={imageDefault}
          alt=""
        />
      )}
    </div>
  );
};

export default Profile;
