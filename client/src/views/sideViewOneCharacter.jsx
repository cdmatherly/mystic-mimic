import { useState } from "react";
import ItemDrawer from '../components/ItemDrawer'

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1);
  const [isItemListOpen, setIsItemListOpen] = useState(false)
  const {character} = props

  const toggleTab = (index) => {
    setToggleState(index);
    console.log(toggleState);
  };

  const handleAddItems = () => {
    setIsItemListOpen(true)
  }

  return (
    <>
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400 relative">
          <li className="w-full">
              <button className={toggleState === 1 ? "inline-block w-full p-4 bg-white focus:bg-gray-100 rounded-l-lg focus:text-lg focus:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-sky-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700": "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"} onClick={() => toggleTab(1)}>Inventory</button>
          </li>
          <li className="w-full">
              <button className={toggleState === 2 ? "inline-block w-full p-4 bg-white focus:bg-gray-100 rounded-r-lg focus:text-lg focus:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-sky-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700": "inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"} onClick={() => toggleTab(2)}>Description</button>
          </li>
          {/* <li className="w-full">
              <a href="#" className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Settings</a>
          </li>
          <li className="w-full">
              <a href="#" className="inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Invoice</a>
          </li> */}
        </ul>
        <br/>
        <div className="content-tabs ">
          <div
            className={ ' ' + (toggleState === 1 ? "content  active-content " : "  hidden")}
            >
            <h2 className="mb-3">Inventory Items: </h2>
            <hr />
            {/* UNCOMMENT when fixed */}
            {/* <p className="text-right"><button onClick={handleAddItems}>Add items to inventory</button></p> */}
            <ItemDrawer isOpen={isItemListOpen} setIsOpen={setIsItemListOpen}/>
            <ul>
              {character.inventory.map((item) => 
              <li key={item._id} className="ml-5">{item.name}</li>
              )}
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
      {/* </div> */}

      
    </>
  );
}

export default Tabs;