import quoteFields from "../campos_cotizacion";

function emailQuote(quote: quoteFields) {
    return Promise.resolve();
    // return emailjs.send(
    //     'service_2tjakvh',
    //     'template_rd5gdcd',
    //     {
    //         'productName': `${quote.productName}`,
    //         'partNumber': `${quote.partNumber}`,
    //         'maker': `${quote.maker}`,
    //         'howMany': `${quote.howMany}`,
    //         'type': `${quote.type}`,
    //         'metricUnit': `${quote.metricUnit}`,
    //         'origin': `${quote.origin}`,
    //         'useArea': `${quote.useArea}`,
    //         'additionalInfo': `${quote.additionalInfo}`,
    //         'to_reply': 'chemico.dev@gmail.com'
    //     },
    //     'H51r8KvhSQF6bf2AO'
    // );
}

export default emailQuote