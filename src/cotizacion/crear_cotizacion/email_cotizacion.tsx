import emailjs from '@emailjs/browser';
import { QuoteFields } from "../campos_cotizacion";

function emailQuote(quote: QuoteFields) {
    if (process.env.NODE_ENV === 'production') {
        return emailjs.send(
            'service_2tjakvh',
            'template_rd5gdcd',
            {
                'id': `${quote.id}`,
                'productName': `${quote.nombre}`,
                'partNumber': `${quote.parte}`,
                'maker': `${quote.fabricante}`,
                'howMany': `${quote.cant}`,
                'type': `${quote.presentacion}`,
                'metricUnit': `${quote.unidad}`,
                'origin': `${quote.planta}`,
                'useArea': `${quote.area}`,
                'additionalInfo': `${quote.additionalInfo}`,
                'to_reply': 'chemico.dev@gmail.com'
            },
            'H51r8KvhSQF6bf2AO'
        );
    }
    
    return Promise.resolve(); 
}

export default emailQuote