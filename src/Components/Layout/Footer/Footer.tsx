import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter className="py-6 bg-blue-400">
      <div className="flex justify-center w-full">
        <FbFooter.Copyright
          href="#"
          by="idan_david"
          year={2024}
          className="text-slate-100"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;
