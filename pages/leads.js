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


function Leads({data_leads}) {
    const data = {
        columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'Category',
            field: 'category',
            sort: 'disabled',
            width: 220
        },
        {
            label: 'Email',
            field: 'email',
            sort: 'disabled',
            width: 200
        },
        {
            label: 'Phone Number',
            field: 'phoneNumber',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'UTM Source',
            field: 'utmSource',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'UTM Medium',
            field: 'utmMedium',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'UTM Campaign',
            field: 'utmCampaign',
            sort: 'disabled',
            width: 150
        },
        {
            label: 'Date',
            field: 'timestamp',
            sort: 'disabled',
            width: 150
        }
        ],
        rows: data_leads
    }
    return (
        <div>
            <Drawer>
                {/* <TableList data={data_leads}/> */}
                <div className="box_action">
                    <div>
                        <CSVLink data={data_leads} filename={"data-leads.csv"} style={{textDecoration:'none',color:'black'}}>
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

Leads.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.bintarojayahighrise.com/api/getform')
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


export default Leads
