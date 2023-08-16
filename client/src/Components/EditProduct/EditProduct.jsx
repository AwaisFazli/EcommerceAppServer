import React, { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { MdClose } from "react-icons/md";
import { setReload } from "../../Store/Slices/userDataSlices";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = ({ editProductData, closeEditProductBar }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(editProductData);
  const [editImage, setEditImage] = useState(editProductData.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setEditData(editProductData);
    setEditImage(editProductData.imageUrl);
    setIsLoading(false);
  }, [editProductData]);

  const editImageHandler = (event, id) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setEditImage({
        imageUrl: URL.createObjectURL(selectedImage),
        image: selectedImage,
      });
    }

    setIsLoading(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", selectedImage);

    const headers = {
      "Content-Type": "multipart/form-data",
      token: token,
    };

    axios
      .post(`/seller/productImage/${id}`, formData, {
        headers: headers,
      })
      .then((response) => {
        console.log("Updated Successfully");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error updating product image:", error.message);
        setIsLoading(false);
      });
  };

  const updateHandler = (id) => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios
      .put("/seller/productData/" + id, editData, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        console.log("Updated Successfully");
        setIsLoading(false);
        closeEditProductBar(false);
        dispatch(setReload());
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="">
      <>
        <div className="mb-[2rem] flex justify-between">
          <h1>Edit Product</h1>
          <span onClick={() => closeEditProductBar(false)}>
            <MdClose size={30} />
          </span>
        </div>
        <div>
          <div className="">
            <TextField
              variant="standard"
              label={"Name"}
              value={editData.name}
              onChange={(event) => {
                setEditData({ ...editData, name: event.target.value });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <br />
          <div>
            <TextField
              sx={{
                "& .MuiTextField-root": { m: 1, color: "#3b5442" },
              }}
              variant="standard"
              label={"Description"}
              value={editData.description}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  description: event.target.value,
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <br />
          <div>
            <TextField
              variant="standard"
              label={"Price"}
              value={editData.price}
              onChange={(event) => {
                setEditData({ ...editData, price: event.target.value });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <br />
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <CircularProgress className="loader" />
            </div>
          ) : (
            <button
              type="submit"
              onClick={() => updateHandler(editData._id)}
              className="w-full py-[1rem] border-[#959191] border-2 text-[black] hover:border-[#3b5442] hover:bg-[#3b5442] hover:text-[#f7f2dd] transition-all"
            >
              Submit
            </button>
          )}
        </div>
        <div className="pt-[2rem]">
          {editImage?.imageUrl ? (
            <div className="w-[200px] h-[200px] overflow-hidden">
              <img src={editImage.imageUrl} alt="" className="" />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] overflow-hidden">
              <img src={editData.imageUrl} alt="" className="" />
            </div>
          )}
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => editImageHandler(event, editData._id)}
          />
        </div>
      </>
    </div>
  );
};

export default EditProduct;
