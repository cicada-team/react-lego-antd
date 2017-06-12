import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
      <Head>
        <style>{`body { margin: 0 } /* custom! */`}</style>
        <link href="/static/antd.min.css" rel="stylesheet" />
      </Head>
      <body className="custom_class">
      {this.props.customValue}
      <Main />
      <NextScript />
      </body>
      </html>
    )
  }
}