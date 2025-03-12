import React, { use } from 'react'
import { useState } from 'react';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';
const VirtualContest = () => {
const navigate = useNavigate();
const [easy,seteasy] = useState(0);
const [medium, setmedium] = useState(0);
const [hard, sethard] = useState(0);
  return (
    <section>
      <div className="p-7 ml-16">
        <h1 className="text-3xl"> Cook a Contest</h1>
        <div className="p-7 flex flex-col">
          <Category type="easy" val={easy} setval={seteasy} />
          <div className="flex items-center">
            <Category type="medium" val={medium} setval={setmedium} />
            <button
              className="btn btn-wide ml-24 border-none bg-dark hover:bg-darkest"
              onClick={() => navigate("/contest/67d1a60d90638e3d54240356")}>
              Build
            </button>
          </div>
          <Category type="hard" val={hard} setval={sethard} />
        </div>
      </div>
    </section>
  );
}

export default VirtualContest