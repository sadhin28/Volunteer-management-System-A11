const Spiner= ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center  text-center">
      <div className="w-12 h-12 border-4 border-[#511AB7FF] border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-[#511AB7FF]">{message}</p>
    </div>
  );
};


export default Spiner;