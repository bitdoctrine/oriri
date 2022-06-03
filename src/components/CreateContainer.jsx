import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdPriceCheck,
} from 'react-icons/md';

import { categories } from './utils/data';
import LoadingBox from './LoadingBox';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase.config';
import { getMenuItems, saveNewItem } from './utils/firebaseFunctions';
import { useStateValue } from './context/StateProvider';
import actionType from '../components/context/reducer';

export const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const [{ menuItems }, dispatch] = useStateValue();

  const uploadHandler = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setFields(true);
        setMsg('An Error Has Occured: ⚠️ Retry ');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setImageAsset(getDownloadURL);
          setLoading(false);
          setFields(true);
          setMsg('Image Uploaded 😀');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImageHandler = () => {
    setLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setFields(true);
      setMsg('Upload Cancel ❌');
      setAlertStatus('danger');
      setLoading(false);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    });
  };

  const saveHandler = () => {
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg('All Fields Are Required ⚠️  ');
        setAlertStatus('danger');
        setLoading(false);
        setTimeout(() => {
          setFields(false);
        }, 2000);
      } else {
        setLoading(true);
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageUrl: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveNewItem(data);
        setLoading(false);
        setFields(true);
        setAlertStatus('success');
        setMsg(' Upload Success 😀');
        clearFields();

        setTimeout(() => {
          setFields(false);
        }, 3000);
      }
    } catch (err) {
      setFields(true);
      setMsg('An Error Has Occured: ⚠️ Retry ');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 4000);
    }
  };

  const clearFields = () => {
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCategory('Select Category');
  };

  const fetchData = async () => {
    await getMenuItems().then((data) => {
      dispatch({ type: actionType.SET_MENU_ITEMS, menuItems: data });
    });
  };

  return (
    <div className="w-full  min-h-screen  flex items-center justify-center gap-3">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="title...."
            className="w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full my-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white text-textColor">
              Select Category
            </option>
            {categories &&
              categories.map((c) => (
                <option
                  key={c.id}
                  value={c.slug}
                  className=" bg-white border-0 capitalize outline-none text-textColor "
                >
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Upload Product
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadHandler}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImageHandler}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdPriceCheck className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center w-full mt-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-purple-600 px-12 py-2 rounded-lg text-white font-semibold"
            onClick={saveHandler}
          >
            Add
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
