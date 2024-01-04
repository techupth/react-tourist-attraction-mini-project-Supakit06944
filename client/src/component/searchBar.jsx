import { useState, useEffect } from "react";
import axios from "axios";
function SearchBar() {
  const [locationInput, setLocationInput] = useState("");
  const [locationName, setLocationName] = useState([]);

  const serchBookName = async () => {
    const getBookName = await axios.get(
      `http://localhost:4001/trips?keywords=${locationInput}`
    );
    setLocationName(getBookName.data.data);
    console.log(getBookName.data.data);
  };
  useEffect(() => {
    serchBookName();
  }, [locationInput]);

  const getCategory = (meassage) => {
    if (locationInput) {
      setLocationInput(locationInput + " " + meassage);
    } else {
      setLocationInput(meassage);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <input
          className=" w-[70%] ml-[10px]  h-[40px] border-b-[3px] text-center mb-[20px]"
          type="text"
          placeholder="หาที่เที่ยวไปกับ ..."
          onChange={(e) => {
            setLocationInput(e.target.value);
          }}
          value={locationInput}
        />
      </div>
      <ul className="flex-col justify-center ">
        {locationName.map((item, index) => {
          const imageIcon = item.photos.slice(1);
          const description = item.description;

          return (
            <div className="" key={index}>
              <li className="flex flex-wrap">
                <div className="image">
                  <img
                    className="w-[330px] h-[230px] rounded-[30px] m-[25px] ml-[40px] mr-[35px]"
                    src={item.photos[0]}
                  />
                </div>
                <div className="location-infomation mt-[25px]">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <p className="flex flex-wrap w-[1000px]">
                    {description.slice(0, 100) + "..."}
                  </p>
                  <a className="text-[#2596D9]" href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                  <p className="categoty">
                    หมวด :{" "}
                    {item.tags.map((tage, index) => {
                      if (index === item.tags.length - 1) {
                        return (
                          <span key={index}>
                            {" "}
                            และ{" "}
                            <button
                              className=" underline mr-[10px]"
                              onClick={() => {
                                getCategory(tage);
                              }}
                            >
                              {tage}
                            </button>
                          </span>
                        );
                      } else {
                        return (
                          <button
                            className=" underline mr-[10px]"
                            key={index}
                            onClick={() => {
                              getCategory(tage);
                            }}
                          >
                            {tage}
                          </button>
                        );
                      }
                    })}
                  </p>
                  <div className="image-icon flex">
                    {imageIcon.map((icon, index) => {
                      return (
                        <img
                          key={index}
                          className=" mr-[25px] w-[95px] h-[90px] mt-[20px] mb-[10px] rounded-[9px]"
                          src={icon}
                        />
                      );
                    })}
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchBar;
