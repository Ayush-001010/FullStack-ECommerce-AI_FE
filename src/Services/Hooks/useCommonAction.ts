import APICallingServices from "../APICallingServices";

const useCommonAction = () => {
  const getImage = async (key: string) => {
    const response = await APICallingServices.getRequest(
      "/image/getImage?key=" + key
    );
    if (response.success) {
      return response.data;
    } else {
      return null;
    }
  };
  return { getImage };
};

export default useCommonAction;
