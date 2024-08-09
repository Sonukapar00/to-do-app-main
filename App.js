            
import React, { useState, useEffect } from 'react';

import { Table, Tag, Input } from 'antd';

const { Search } = Input;

const App = () => {
  const [timestamp, setTimestamp] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('OPEN');
  const [tag, setTag] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => a.timestamp - b.timestamp,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Open',
          value: 'OPEN',
        },
        {
          text: 'Working',
          value: 'WORKING',
        },
        {
          text: 'Done',
          value: 'DONE',
        },
        {
          text: 'Overdue',
          value: 'OVERDUE',
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <button onClick={() => handleEdit(record)}>Edit</button>
          <button onClick={() => handleDelete(record)}>Delete</button>
        </span>
      ),
    },
  ];

  const addTask = () => {
    const newTask = {
      timestamp: new Date().toLocaleString(),
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      tag: tag,
    };
    setTimestamp('');
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('OPEN');
    setTag('');
  };
  
  const handleEdit = (record) => {
    setTitle(record.title);
    setDescription(record.description);
    setDueDate(record.dueDate);
    setStatus(record.status);
    setTag(record.tag);
    setTasks(tasks.filter((task) => task.timestamp !== record.timestamp));
  };
  
  const handleDelete = (record) => {
    setTasks(tasks.filter((task) => task.timestamp !== record.timestamp));
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };
  
  useEffect(() => {
    if (searchText === '') {
      setFilteredTasks(tasks); // reset filteredTasks to the original tasks array
    } else {
      const filteredTasks = tasks.filter((task) => task.title.includes(searchText));
      setFilteredTasks(filteredTasks);
    }
  }, [searchText, tasks]);
  
  return (
    <div>
      <h1>To-Do App</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>{tasks.timestamp}</label>
        <br />
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={10}
            />
            </label>
            <br />
            <label>
            Description:
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={1000}
            />
            </label>
            <br />
            <label>
            Due Date:
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />
            </label>
            <br />
            <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="OPEN">Open</option>
            <option value="WORKING">Working</option>
            <option value="DONE">Done</option>
            <option value="OVERDUE">Overdue</option>
            </select>
            </label>
            <br />
            <label>
            Tag:
            <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            />
            </label>
            <br />
            <button onClick={addTask}>Add Task</button>
            </form>
            <div style={{ margin: '16px 0' }}>
        <Search placeholder="Search tasks by title" onSearch={handleSearch} />
      </div>

      <Table columns={columns} dataSource={filteredTasks} />
          
            <br />
            <br />
            
            </div>
            );
            };
            
            export default App;
