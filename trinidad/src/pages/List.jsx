import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoaderComponent from '../components/LoaderComponent'
import confiq from '../data/config.json'
import "../styles/List.scss"

const PER_PAGE = 10;

const List = () => {
  const [data, setdata] = useState([]);
  const [dbData, setDbData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [ascending, setAscending] = useState(0);
  const [nameSortNr, setNameSortNr] = useState(0);
  const [surNameSortNr, setSurNameSortNr] = useState(0);
  const [sexSortNr, setSexSortNr] = useState(0);
  // const [dateSortNr, setDateSortNr] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [openedNr, setOpenedNr] = useState(-1);

  const getPageNumbers = (json) => {
    const numbers = [];
    for (let index = 1; index < json.list.length/PER_PAGE+1; index++) {
      numbers.push(index);
    }
    setPages(numbers); // [1,2,3,4]
  }

  useEffect(() => {
    fetch(confiq.listDataFromUrl)
      .then(res => res.json())
      .then(json => {
        setdata(json.list.slice());
        setDbData(json.list.slice());
        getPageNumbers(json);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {

    return (
      <LoaderComponent />
    )
  }

  const sortNameAZ = () => {
    // setAscending(!ascending);
    // const sortedNameData = data.sort((a, b) => {
    //   return ascending
    //   ? a.firstname.localeCompare(b.firstname)
    //   : b.firstname.localeCompare(a.firstname)
    // } 
    // )
    // setdata(sortedNameData)
    setSurNameSortNr(0);
    setSexSortNr(0);
    if (nameSortNr === 0) {
      data.sort((a, b) => a.firstname.localeCompare(b.firstname));
      setdata(data.slice());
      setNameSortNr(1);
    } else if (nameSortNr === 1) {
      data.sort((a, b) => b.firstname.localeCompare(a.firstname));
      setdata(data.slice());
      setNameSortNr(2);
    } else {
      setdata(dbData.slice());
      setNameSortNr(0);
    }
  }

  const sortSurnameAZ = () => {
    // setAscending(!ascending)
    // const sortedSurenameData = data.sort((a, b) => {
    //   return ascending
    //   ? a.surname.localeCompare(b.surname)
    //   : b.surname.localeCompare(a.surname)
    // })
    // setdata(sortedSurenameData)
    setNameSortNr(0);
    setSexSortNr(0);
    if (surNameSortNr === 0) {
      data.sort((a, b) => a.surname.localeCompare(b.surname));
      setdata(data.slice());
      setSurNameSortNr(1);
    } else if (surNameSortNr === 1) {
      data.sort((a, b) => b.surname.localeCompare(a.surname));
      setdata(data.slice());
      setSurNameSortNr(2);
    } else {
      setdata(dbData.slice());
      setSurNameSortNr(0);
    }
  }

  const sortSex = () => {
    setNameSortNr(0);
    setSurNameSortNr(0);
    if (sexSortNr === 0) {
      data.sort((a, b) => a.sex.localeCompare(b.sex));
      setdata(data.slice());
      setSexSortNr(1);
    } else if (sexSortNr === 1) {
      data.sort((a, b) => b.sex.localeCompare(a.sex));
      setdata(data.slice());
      setSexSortNr(2);
    } else {
      setdata(dbData.slice());
      setSexSortNr(0);
    }
  };

  const personalCodeToDate = (personalCode) => {
    const codeString = JSON.stringify(personalCode);
    let century = '';
    if (codeString.charAt(0) < 3) century = '18';
    else if (codeString.charAt(0) < 5) century = '19';
    else century = '20';

    return new Date(
      `${century}${codeString.charAt(1)}${codeString.charAt(2)}`,
      `${codeString.charAt(3)}${codeString.charAt(4)}` - 1,
      `${codeString.charAt(5)}${codeString.charAt(6)}` - 1
    );
  }

  const sortDate = () => {
    setAscending(!ascending);
    const sortedArray = data.sort((a, b) => {
      return ascending
        ? personalCodeToDate(a.personal_code) - personalCodeToDate(b.personal_code)
        : personalCodeToDate(b.personal_code) - personalCodeToDate(a.personal_code)
    });
    setdata(sortedArray);
  }

  const openListItem = (itemId) => {
    setOpenedNr(itemId);
  }

  return (
    <div className='inline-table inline'>
      <h1 className='list-title'>Nimekiri</h1>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='table-name-col'>
                <button onClick={sortNameAZ} className='button-sort'>Eesnimi</button>
                {nameSortNr === 0 && <i aria-hidden="true" className="fa fa-sort fa-lg"></i>}
                {nameSortNr === 1 && <i aria-hidden="true" className="fa fa-sort-down fa-lg"></i>}
                {nameSortNr === 2 && <i aria-hidden="true" className="fa fa-sort-up fa-lg"></i>}
              </th>
              <th className='table-name-col'>
                <button onClick={sortSurnameAZ} className='button-sort'>Perekonnanimi</button>
                {surNameSortNr === 0 && <i aria-hidden="true" className="fa fa-sort fa-lg"></i>}
                {surNameSortNr === 1 && <i aria-hidden="true" className="fa fa-sort-down fa-lg"></i>}
                {surNameSortNr === 2 && <i aria-hidden="true" className="fa fa-sort-up fa-lg"></i>}
              </th>
              <th>
                <button onClick={sortSex} className='button-sort'>Sugu</button>
                {sexSortNr === 0 && <i aria-hidden="true" className="fa fa-sort fa-lg"></i>}
                {sexSortNr === 1 && <i aria-hidden="true" className="fa fa-sort-down fa-lg"></i>}
                {sexSortNr === 2 && <i aria-hidden="true" className="fa fa-sort-up fa-lg"></i>}
              </th>
              <th>
                <button onClick={sortDate} className='button-sort'>Sünnipäev</button>
                <i aria-hidden="true" className="fa fa-sort fa-lg"></i></th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {data.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE).map(item => 
              <>
                {openedNr !== item.id ? 
                <tr key={item.id} onClick={() => openListItem(item.id)}>
                  <td>{item.firstname}</td>
                  <td>{item.surname}</td>
                  <td>{item.sex === 'f' ? 'Naine' : 'Mees'}</td>
                  <td>{personalCodeToDate(item.personal_code).toLocaleDateString()}</td>
                  <td>{item.phone}</td>
                </tr> : 
                <>
                  <tr style={{backgroundColor: "white", color: "black"}} onClick={() => setOpenedNr(0)}>
                    <td>{item.firstname}</td>
                    <td>{item.surname}</td>
                    <td>{item.sex === 'f' ? 'Naine' : 'Mees'}</td>
                    <td>{personalCodeToDate(item.personal_code).toLocaleDateString()}</td>
                    <td>{item.phone}</td>
                  </tr>
                  <tr style={{backgroundColor: "white", color: "black"}} onClick={() => setOpenedNr(0)}>
                    <td colspan="5"> 
                      <img style={{width: "150px"}} src={item.image.small} alt="" /> 
                      <span dangerouslySetInnerHTML={{__html: item.body.substring(0, 299).concat('...')}}></span>
                      <Link to={"/article/" + item.id}>
                        <button>Loe lähemalt</button>
                      </Link>
                    </td>
                  </tr>
                </>
                }
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className='button-wrapper'>
        <button 
          className='button-transparent' 
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
            <i aria-hidden="true" className="fa fa-chevron-left fa-md"></i> 
        </button>
          {/* <button className='button-transparent' onClick={() => setCurrentPage(currentPage - 1 )}> {currentPage - 1} </button>
          <button className='button-transparent'> {currentPage} </button>
          <button className='button-transparent' onClick={() => setCurrentPage(currentPage + 1)}> {currentPage + 1} </button> */}
        {pages.map(page => 
          <button 
            key={page}
            className={`button-transparent ${currentPage === page ? "active" : undefined}`} 
            onClick={() => setCurrentPage(page)}>
              {page}
          </button>)}
        <button 
          className='button-transparent' 
          onClick={() => setCurrentPage(currentPage < pages.length ? currentPage + 1 : currentPage)}>
            <i aria-hidden="true" className="fa fa-chevron-right fa-md"></i> 
        </button>
      </div>
    </div>
  )
}

export default List