import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
// schema is in models/postMessage

export default function FormPiano() {
  const [postData, setPostData] = useState({
    creator: "",
    level: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };
  const clear = (e) => {
    e.preventDefault();
    setPostData({ creator: "", level: "", selectedFile: "" });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <h3 style={{ textAlign: "center" }}>انشئ دورة</h3>

        <input
          style={{ width: "85%", padding: "5px", margin: "10px" }}
          placeholder="الاسم الكامل"
          name="creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <input
          style={{ width: "85%", padding: "5px", margin: "10px" }}
          placeholder="المستوى"
          name="level"
          value={postData.level}
          onChange={(e) => setPostData({ ...postData, level: e.target.value })}
        />
        <div style={{ textAlign: "center" }}>الاَلة: بيانو</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button
          type="submit"
          style={{ width: "85%", padding: "5px", margin: "10px" }}
        >
          انشئ
        </button>
        <button
          onClick={clear}
          style={{ width: "85%", padding: "5px", margin: "10px" }}
        >
          مسح
        </button>
      </form>
    </div>
  );
}
