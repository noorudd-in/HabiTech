const IMG = ({ src, alt }) => {
  return (
    <div className="max-w-[718px] max-h-[718px] mx-auto">
      <img src={src} alt={alt} />
    </div>
  );
};

export default IMG;
