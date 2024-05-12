import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const VaultQuickAccess = () => {
  const navigate = useNavigate();
  const chats = () => {
    navigate("/vault-contents");
  };
  const styles = "bg-gray-800 p-3 rounded-md border border-gray-600";

  return (
    <>
      <div className="mt-3 mb-5">
        <div className="grid grid-cols-3 gap-3">
          <div className={styles} onClick={chats}>
            <div className="mb-2">
              <FontAwesomeIcon icon={faUserSecret} size="lg" />
            </div>
            Encrypted Texts
          </div>
        </div>
      </div>
    </>
  );
};

export default VaultQuickAccess;
