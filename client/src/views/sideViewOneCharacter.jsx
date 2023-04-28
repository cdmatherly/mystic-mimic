import { useState } from "react";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
    console.log(toggleState);
  };

  return (
    <div className="container">
      <div className="bloc-tabs mb-8">
        <div>
          <button className={toggleState === 1 ? "tabs active-tabs mr-8 text-2xl border-t-4 border-r-4 border-l-4 p-3 bg-grey-300" : "tabs "} onClick={() => toggleTab(1)}>
            Inventory
          </button>
          <button className={toggleState === 2 ? "tabs active-tabs ml-8 text-2xl border-t-4 border-r-4 border-l-4 p-3 bg-grey-300" : "tabs"} onClick={() => toggleTab(2)}>
            Description
          </button>
          <hr />
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "hidden"}
        >
          <h2 className="mb-3 ">Items</h2>
          <hr />
          <ul>
            <li className="ml-5">One Item</li>
            <li className="ml-5">Two Item</li>
            <li className="ml-5">Three Item</li>
          </ul>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "hidden"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Tabs;