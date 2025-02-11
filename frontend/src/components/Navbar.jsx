import profile from "../assets/profile.jpg"

const Navbar =  () => {

  return (
    <section>
      <nav>
        <div className="flex h-[75px] justify-between w-full bg-darkest px-[60px]">
          <a className="flex items-center justify-center text-white text-2xl px-4"
          href="/">
            {" "}
            LOGO
          </a>
          <div >
            <img
              src={profile}
              alt="Profile"
              width={50}
              className="rounded-full my-3"
            />
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar