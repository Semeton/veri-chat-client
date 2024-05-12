import { useParams, useNavigate } from "react-router-dom";
import Http from "../../../services/handlers/Http";
import { baseUrl } from "../../../services/api/urls/Links";
import { Endpoints } from "../../../services/api/urls/Endpoints";
import Alerts from "../../../util/alerts/Alerts";
import { useEffect, useState } from "react";
import { faArrowLeftLong, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarLoader from "../../components/BarLoader";
import LoadingButton from "../../components/buttons/LoadingButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const VaultContentView: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [sending, setSending] = useState<Boolean>(false);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [formdata, setFormdata] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

  const { id, secret } = useParams();
  const http = Http.getInstance();
  const decryptTextUrl = baseUrl + Endpoints.decryptText;
  const updateEncrypTextUrl = baseUrl + Endpoints.updateEncrypText + id;

  const navigate = useNavigate();

  useEffect(
    () => {
      getDecryptText();
      setLoading(false);
    },
    // eslint-disable-next-line
    [],
  );

  const getDecryptText = () => {
    setLoading(true);
    http
      .get(decryptTextUrl + id + "/" + secret)
      .then((res) => {
        console.log(res);
        setFormdata({ ...formdata, title: res.title, body: res.document });
        setLoading(false);
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        navigate("/vault-contents");
      });
  };

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e: any) => {
    setSending(true);
    e.preventDefault();
    const formData: FormData = new FormData();
    formData.append("title", formdata.title);
    formData.append("body", formdata.body);
    formData.append("secret", secret as any);
    formData.append("persist", "true");

    http
      .post(updateEncrypTextUrl, formData)
      .then((res) => {
        Alerts.success(res.message);
        setEditMode(false);
        setSending(false);
      })
      .catch((e) => {
        let message = e.response?.data?.error ?? e.message;
        Alerts.error(message);
        setSending(false);
        setEditMode(false);
      });
  };

  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <BarLoader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div
            onClick={() => navigate("/vault-contents")}
            className={"cursor-pointer"}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-3" />
            Back
          </div>
          <div className="mt-10 space-y-4">
            {editMode ? (
              <form
                method="POST"
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="text-xl rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="title"
                    value={formdata.title}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="body"
                    id="emailBody"
                    className="sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    cols={30}
                    rows={20}
                    value={formdata.body}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                {sending ? (
                  <LoadingButton type="button" text="Processing..." />
                ) : (
                  <PrimaryButton type="submit" text="Encrypt" />
                )}
              </form>
            ) : (
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  {formdata.title}
                </h1>
                <p className="my-8" style={{ whiteSpace: "pre-line" }}>
                  {formdata.body}
                </p>
                <div
                  className="text-indigo-500"
                  onClick={() => setEditMode(true)}
                >
                  <FontAwesomeIcon icon={faEdit} size="2xl" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VaultContentView;
