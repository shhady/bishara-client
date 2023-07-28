import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/subscription-plans/teacher/${id}`
        );

        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.teacherId === id &&
    student.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const dateA = new Date(a.dateStarted);
    const dateB = new Date(b.dateStarted);
    return sortOption === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  const drawStudents = () => {
    return currentStudents.map((student, i) => (
      <div key={i} style={styles.studentContainer}>
        <div style={styles.infoContainer}>
          <div style={styles.name}>الاسم: {student.userName}</div>
          <div style={styles.name}>
            تاريخ الاشتراك: {new Date(student.dateStarted).toLocaleDateString()}
          </div>
          <div style={styles.name}>
            الفترة: {student.period === 'year' && 'سنة'}{' '}
            {student.period === '6 months' && '6 أشهر'}
          </div>
          <div style={styles.name}>الحالة: {student.status === 'active' ? 'فعال' : 'غير فعال'}</div>
        </div>
      </div>
    ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={styles.pagination}>
        {pageNumbers.map((number) => (
          <div
            key={number}
            style={number === currentPage ? styles.activePage : styles.page}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="بحث"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <select value={sortOption} onChange={handleSortChange} style={styles.sortSelect}>
          <option value="asc">ترتيب تصاعدي</option>
          <option value="desc">ترتيب تنازلي</option>
        </select>
      </div>
      <div style={styles.studentsContainer}>{drawStudents()}</div>
      {renderPagination()}
    </div>
  );
}

// Styles

const styles = {
  container: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controls: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px',
    margin: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
  },
  sortSelect: {
    padding: '8px',
    borderRadius: '4px',
    margin: '10px',
    width: '50%',
  },
  studentsContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Added flex-wrap property
    justifyContent: 'center', // Added justifyContent property
    gap: '10px',
    maxWidth: '1200px', // Added maxWidth property
    margin: '0 auto 70px auto', // Added margin property for center alignment
  },
  studentContainer: {
    display: 'flex',
    minWidth: '300px',
    width: 'fit-content',
    margin: 'auto',
    border: '1px solid black',
    padding: '10px',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    flex: '1',
  },
  name: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  page: {
    cursor: 'pointer',
    margin: '0 5px',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    color: '#555',
  },
  activePage: {
    cursor: 'pointer',
    margin: '0 5px',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#555',
    color: '#fff',
  },
};

const breakpoints = {
  desktop: '1024px',
};

// Apply flex-wrap on desktop screens
styles.studentsContainer['@media (min-width: ' + breakpoints.desktop + ')'] = {
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

