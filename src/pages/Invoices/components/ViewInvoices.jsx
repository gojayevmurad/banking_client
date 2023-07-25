import React, { useState } from "react";
import { ChevronUp, ChevronDown, formatMoney } from "../../../utils";

const ViewInvoices = () => {
  const [invoicesData, setInvoicesData] = useState({
    invoiceSent: {
      data: 1234,
      percent: 2,
      increase: false,
      color: "red",
    },
    paidInvoice: {
      data: 932,
      percent: 2,
      increase: true,
      color: "green",
    },
    pendingInvoice: {
      data: 123.2,
      percent: 2,
      increase: false,
      color: "red",
    },
    unpaidInvoice: {
      data: 456,
      percent: 2,
      increase: true,
      color: "green",
    },
  });

  return (
    <div className="view_invoices">
      <div className="box invoice_sent">
        <div>
          <div className="data">
            <p data-color="grey">Göndərilən</p>
            <span>${formatMoney(invoicesData.invoiceSent.data)}</span>
          </div>
          <div data-bg="purple" className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              id="double-check"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M16.5303 6.46967C16.8232 6.76256 16.8232 7.23744 16.5303 7.53033L6.53033 17.5303C6.38968 17.671 6.19891 17.75 6 17.75 5.80109 17.75 5.61032 17.671 5.46967 17.5303L1.46967 13.5303C1.17678 13.2374 1.17678 12.7626 1.46967 12.4697 1.76256 12.1768 2.23744 12.1768 2.53033 12.4697L6 15.9393 15.4697 6.46967C15.7626 6.17678 16.2374 6.17678 16.5303 6.46967zM22.5303 6.46966C22.8232 6.76254 22.8232 7.23742 22.5303 7.53032L12.5308 17.5303C12.2379 17.8232 11.7631 17.8232 11.4702 17.5304L9.96975 16.0304C9.67681 15.7376 9.67674 15.2627 9.96959 14.9697 10.2624 14.6768 10.7373 14.6767 11.0303 14.9696L12.0004 15.9394 21.4697 6.46968C21.7625 6.17678 22.2374 6.17677 22.5303 6.46966z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div>
          {invoicesData.invoiceSent.increase ? <ChevronUp /> : <ChevronDown />}
          <p data-color={invoicesData.invoiceSent.color}>
            + {invoicesData.invoiceSent.percent}%
            <span data-color="grey"> keçən aya nisbətən</span>
          </p>
        </div>
      </div>
      <div className="box paid_invoice">
        <div>
          <div className="data">
            <p data-color="grey">Ödənilən</p>
            <span>${formatMoney(invoicesData.paidInvoice.data)}</span>
          </div>
          <div data-bg="blue" className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="check"
              fill="#fff"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path>
            </svg>
          </div>
        </div>
        <div>
          {invoicesData.paidInvoice.increase ? <ChevronUp /> : <ChevronDown />}
          <p data-color={invoicesData.paidInvoice.color}>
            + {invoicesData.paidInvoice.percent}%
            <span data-color="grey"> keçən aya nisbətən</span>
          </p>
        </div>
      </div>
      <div className="box pending_invoice">
        <div>
          <div className="data">
            <p data-color="grey">Gözlənilən</p>
            <span>${formatMoney(invoicesData.pendingInvoice.data)}</span>
          </div>
          <div data-bg="orange" className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="question-mark"
              height={24}
              width={24}
              fill="#fff"
            >
              <g data-name="Layer 2">
                <g data-name="question-mark">
                  <rect
                    width="24"
                    height="24"
                    opacity="0"
                    transform="rotate(180 12 12)"
                  ></rect>
                  <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                  <circle cx="12" cy="19" r="1"></circle>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div>
          {invoicesData.pendingInvoice.increase ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
          <p data-color={invoicesData.pendingInvoice.color}>
            + {invoicesData.pendingInvoice.percent}%
            <span data-color="grey"> keçən aya nisbətən</span>
          </p>
        </div>
      </div>
      <div className="box unpaid_invoice">
        <div>
          <div className="data">
            <p data-color="grey">Ödənilməyən</p>
            <span>${invoicesData.unpaidInvoice.data}</span>
          </div>
          <div data-bg="red" className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 47.5 47.5"
              viewBox="0 0 47.5 47.5"
              id="exclamation"
              height={24}
              width={24}
            >
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38Z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path
                  fill="#fff"
                  d="M0 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
                  transform="translate(22 6)"
                ></path>
                <path
                  fill="#fff"
                  d="M0 0a3 3 0 0 0-6 0v19a3 3 0 1 0 6 0V0Z"
                  transform="translate(22 14)"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div>
          {invoicesData.unpaidInvoice.increase ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
          <p data-color={invoicesData.unpaidInvoice.color}>
            + {invoicesData.unpaidInvoice.percent}%
            <span data-color="grey"> keçən aya nisbətən</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoices;
