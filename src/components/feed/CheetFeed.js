import React from "react";
import { Link } from "react-router-dom";
import AuthenticatedUserContext from "../../contexts/AuthenticatedUserContext";

function CheetFeed({ cheets, updateParent }) {
  const { authenticatedUserInfo } = React.useContext(AuthenticatedUserContext);

  async function recheet(cheetId) {
    await fetch(`chitter/recheet/${cheetId}`, {
      method: "POST",
    });
    console.log("updating parent");
    updateParent();
    console.log("parent updated");
  }

  return (
    !!cheets && (
      <>
        <div className="block cheet-feed">
          {cheets.map((cheet) => (
            <div className="card" key={cheet.id}>
              <div className="card-content">
                <Link to={`/profile/${cheet.author.username}`}>
                  <div className="subtitle has-text-weight-semibold">
                    {!!cheet.author.super && (
                      <>
                        <i className="fa-solid fa-fire has-text-danger" />{" "}
                      </>
                    )}
                    {`@${cheet.author.username}`}
                  </div>
                </Link>
                <div className="subtitle">{cheet.message}</div>
                <div className="subtitle recheet-section">
                  <div className="subtitle has-text-weight-light has-text-grey-light no-bottom-margin">
                    {!!cheet.isRecheet && (
                      <>
                        {!!cheet.recheeter.super && (
                          <>
                            <i className="fa-solid fa-fire has-text-danger" />{" "}
                          </>
                        )}
                        {`Reecheted by `}
                        <Link
                          to={`/profile/${cheet.recheeter.username}`}
                        >{`@${cheet.recheeter.username}`}</Link>
                      </>
                    )}
                  </div>
                  {cheet.author.username === authenticatedUserInfo.username ||
                  cheet.hasRecheeted ? (
                    <div className="recheet-button has-text-black">
                      {`${cheet.recheetCount} `}
                      <i className="fa-solid fa-retweet" />
                    </div>
                  ) : (
                    <div
                      className="recheet-button has-text-info"
                      onClick={() => recheet(cheet.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {`${cheet.recheetCount} `}
                      <i className="fa-solid fa-retweet" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
}

export default CheetFeed;
