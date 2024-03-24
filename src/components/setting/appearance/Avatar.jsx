import { useRef, useEffect, useState } from "react";

const Avatar = () => {
  const [imageURL, setImageURL] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dfwyvvvdp",
        uploadPreset: "habitech_cloud",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log(result);
          setImageURL(result.info.url);
        }
      }
    );
  }, []);
  return (
    <div>
      <button
        onClick={() => widgetRef.current.open()}
        className="p-2 border text-lg"
      >
        Upload
      </button>

      <hr />
      <div className="w-[120px] lg:w-[180px] h-[120px]">
        <img src={imageURL} alt="Avatar Image" className="rounded-md" />
      </div>
    </div>
  );
};

export default Avatar;
