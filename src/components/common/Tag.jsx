const Tag = ({ tags }) => {
  return (
    <div>
      {tags?.map((tag) => {
        return <h1>{tag}</h1>;
      })}
    </div>
  );
};

export default Tag;
