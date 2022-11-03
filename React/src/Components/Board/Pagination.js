import { isDisabled } from '@testing-library/user-event/dist/utils';
import {React, useEffect, useState} from 'react';
import { Button, Nav } from 'react-bootstrap';
import '../../css/board.css';

function Pagination ({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);


    return (
        <Nav>
            <Button className='paging_button' onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</Button>
            {Array(numPages).fill().map((v,i)=>(
                <Button 
                    className='paging_button'
                    key={i+1} 
                    onClick={() => setPage(i + 1)}
                >
                    {i+1}
                </Button>
            ))}
            <Button className='paging_button' onClick={() => setPage(page + 1)} disabled={page === numPages}>&gt;</Button>
        </Nav>
    );
}

export default Pagination;
