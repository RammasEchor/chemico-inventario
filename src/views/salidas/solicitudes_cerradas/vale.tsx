import { Document, Page, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Material, Solicitud, getSalidasDetail } from '../../../apis/api_material';

interface ValeProps {
    solicitudMaster: Solicitud
}

function Vale(props: ValeProps) {
    const [detalle, setDetalle] = useState<Material[]>([]);

    useEffect(() => {
        getSalidasDetail(props.solicitudMaster.id)
            .then(res => res.json())
            .then(data => {
                setDetalle(data);
            });
    }, [props.solicitudMaster.id])

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>{props.solicitudMaster.descripcion}</Text>
                </View>
                <View>
                    {detalle.map(material => {
                        return (
                            <Text>{material.codigo}</Text>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
}

export default Vale;