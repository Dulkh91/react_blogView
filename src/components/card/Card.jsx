import Header from "./Header";
import Profile from "./Profile";
import TagList from "./TagList";

const Card = ({ data }) => {
  // console.log(data)
  return (
    <div className="max-w-4xl mx-auto bg-white mt-5 p-5 rounded-sm shadow-lg flex justify-between gap-4 items-start">
      <main className=" flex-1">
        <Header titleData={data} />
        <div id="tag" className=" flex items-center gap-2">
          <TagList data={data} />
        </div>
        <article className="text-xs mt-1.5">
          <p>{data.description}</p>
        </article>
      </main>
      <div className=" text-right flex-shrink-0">
        <Profile dataProfile={data} />
      </div>
    </div>
  );
};

export default Card;
