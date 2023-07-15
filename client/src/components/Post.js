import React from "react";
import {formatISO9075} from "date-fns";

function Post({title,summary,cover,content,createdAt}) {
  return (
    <div className="post">
      <div className="image">
        <img src="https://nypost.com/wp-content/uploads/sites/2/2023/07/spiderman-meme-zuckerberg-musk-comp.jpg?resize=878,585&quality=90&strip=all" />
      </div>
      <div className="text">
        <h2>
          {title}
        </h2>
        <p className="info">
          <a className="author">Harshit Thakur </a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">
          {summary}
        </p>
      </div>
    </div>
  );
}

export default Post;
