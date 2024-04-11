import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { Material, Solicitud } from '../../../apis/api_material';
import { dateParser } from '../../../utilities/date_parser';

interface ValeProps {
    solicitudMaster: Solicitud,
    solicitudDetalle: Material[]
}

function Vale(props: ValeProps) {
    return (
        <Document>
            <Page size="A4">
                <View style={{
                    textAlign: 'center',
                    marginTop: '75px',
                    fontSize: '35',
                    marginBottom: '35px'
                }}>
                    <Text>Vale Entrega de Material</Text>
                </View>
                <View style={{
                    fontSize: '17',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: '20px'
                }}>
                    <Text>{`Solicitante: ${props.solicitudMaster.solicitante}`}</Text>
                </View>
                <View style={{
                    fontSize: '17',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: '35px'
                }}>
                    <Text>{`Folio Solicitud: ${props.solicitudMaster.id}`}</Text>
                    <Text>{`Fecha de Aprobación: ${dateParser(props.solicitudMaster.fecha_aprob)}`}</Text>
                </View>
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        fontWeight: 'bold'
                    }}>
                        <Text>Código de Producto</Text>
                        <Text>Cantidad</Text>
                        <Text>Precio Unitario</Text>
                        <Text>Precio Total</Text>
                    </View>
                    <View>
                        {props.solicitudDetalle.map(material => {
                            return (
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    fontWeight: 'bold'
                                }}>
                                    <Text>{material.codigo}</Text>
                                    <Text>{material.cantidad}</Text>
                                    <Text>{material.precioU}</Text>
                                    <Text>{material.precioT}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginRight: '35px',
                        marginTop: '35px'
                    }}>
                        <Text>{`Total: ${props.solicitudMaster.total}`}</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '35px'
                    }}>
                        <Image src={props.solicitudMaster.firma} style={{ height: "100px" }} />
                        <Text>{`Aprobador: ${props.solicitudMaster.aprobador}`}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default Vale;