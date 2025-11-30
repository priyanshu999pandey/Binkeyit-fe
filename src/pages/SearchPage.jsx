import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import Axios from "../utils/Axios";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useParams } from "react-router-dom";
import nothingimg from "../assets/nothing here yet.webp"



const SearchPage = () => {

  
  const param = useLocation()
  // console.log("params",params)
  // console.log("useLocation",param);

  const search = param.search.slice(3)
  // console.log("search",search)
 
  

  const [loading, setLoading] = useState(true); // initial loading
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const [searchText, setSearchText] = useState(""); // if you want a search input
  //  setSearchText(search)
  console.log(data);
  

  const fetchData = async () => {
    try {
      // For subsequent pages, you might not want to set global loading true (optional).
      if (page === 1) setLoading(true);

      const res = await Axios.post("/product/get-searchProduct", {
        search: search || "",
        page: page,
       
      });

      const resp = res?.data;

      if (resp?.success) {
        // set page (server echoes requested page)
        setPage(Number(resp.page) || page);

        // set total pages properly
        setTotalPage(Number(resp.totalPage) || 1);

        // if first page, replace. else append.
        if (Number(resp.page) === 1) {
          setData(Array.isArray(resp.data) ? resp.data : []);
        } else {
          setData((prev) => [
            ...prev,
            ...(Array.isArray(resp.data) ? resp.data : []),
          ]);
        }
      } else {
        // if API returned success:false, you might want to clear / show message
        if (page === 1) setData([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // next page trigger for InfiniteScroll
  const handleFetch = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  // fetch on mount and whenever `page` or `searchText` changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]); // include searchText if you support changing search

  // Loading skeletons
  const loadingPageData = new Array(12).fill("");

  return (
    <section className="w-full min-h-[78vh] p-4 bg-white">
      {/* Optional: search input */}
      {/* <div className="mb-4">
        <input value={searchText} onChange={e=>{ setSearchText(e.target.value); setPage(1); }} placeholder="Search..." />
      </div> */}

      <div className="mb-5 text-center text-xl font-medium">
        Search Result : {data.length}
      </div>

      {/* Initial loading skeleton */}
      {loading && page === 1 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loadingPageData.map((_, index) => (
            <CardLoading key={"load" + index} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={handleFetch}
          hasMore={page < totalPage}
          loader={
            <div className="text-center py-4">
              <p>Loading more...</p>
            </div>
          }
         
        >
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map((p, index) => {
                // prefer p._id if available for key
                const key = p?._id ? p._id : "pro" + index;
                return <CardProduct key={key} data={p} />;
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
       <div className="w-full  flex justify-center items-center">

        { !data[0] &&
            <div className="bg-green-400 w-fit rounded-full">
              <img src={nothingimg} alt="" className="w-60 h-60" />
              
             
              
            </div>
        }
       </div>
    </section>
  );
};

export default SearchPage;
