import SliderBird from "../assets/imgs/slider-bird.png?react";

const Slider = () => {
  return (
    <div className="box-border h-full w-full">
      <img
        src={SliderBird}
        style={{ display: "block" }}
        className="aspect-auto object-fill w-full h-full border-r-2 border-solid border-[#c4c4c4]"
      />
    </div>
  );
};

export default Slider;
