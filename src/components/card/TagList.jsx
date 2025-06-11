const TagList = ({ data }) => {
  return (
    <div>
      {data.tagList &&
        data.tagList.map((tag) => (
          <button
            className={`border border-gray-400 rounded-xs text-sm md:text-md px-2 opacity-50 ${
              tag === null ? "hidden" : ""
            }`}
            key={tag}
          >
            {tag}
          </button>
        ))}
    </div>
  );
};

export default TagList;
