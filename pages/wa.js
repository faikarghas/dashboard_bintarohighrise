import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import Typography from '@material-ui/core/Typography';
import Drawer from '../components/drawer'
import TableList from '../components/tableLeads'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'
import { MDBDataTable } from 'mdbreact';

import { CSVLink, CSVDownload } from "react-csv";


function Wa({data_leads}) {
    const data = {
        columns: [
        {
            label: 'Phone Number',
            field: 'phoneNumber',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'Source',
            field: 'source',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'Date',
            field: 'create_at',
            sort: 'disabled',
            width: 150
        },
        ],
        rows: data_leads
    }
    return (
        <div>
            <Drawer>
                {/* <TableList data={data_leads}/> */}
                <div className="box_action">
                    <div>
                        <CSVLink data={data_leads} filename={"data-wa.csv"} style={{textDecoration:'none',color:'black'}}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Export to Excel
                            </Typography>
                        </CSVLink>
                    </div>
                </div>
                <MDBDataTable
                striped
                bordered
                small
                data={data}
                />
            </Drawer>
        </div>
    )
}

Wa.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.bintarojayahighrise.com/api/getwa')
    const data_leads = await res.json()

    if(ctx.res){
      ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
    if(ctx && !process.browser) {
        if(ctx.req.headers.cookie) {
          ctx.store.dispatch(action.reauthenticate(getCookie('token', ctx.req),getCookie('idusers', ctx.req)))
        }
    }

    const token = ctx.store.getState().token;

    // set gettoken to false if no token in cookies
    if(!token && token !== undefined && ctx.pathname === '/leads'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { data_leads }
  }


export default Wa
