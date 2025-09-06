import React from 'react'
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
    Link,
    Row,
    Column
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type ContactFormEmailProps = {
    message: string;
    senderEmail: string;
    };

export default function ContactFormEmail({message, senderEmail}: ContactFormEmailProps) {
    const currentDate = new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return <Html>
        <Head/>
        <Preview>📧 Yeni İletişim Mesajı</Preview>
        <Tailwind>
            <Body className="bg-gray-50 text-gray-800 font-sans">
                <Container className="mx-auto py-8 px-4 max-w-lg">
                    {/* Header */}
                    <Section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-center">
                    </Section>

                    {/* Main Content */}
                    <Section className="bg-white rounded-lg shadow-sm p-6 mt-4 border border-gray-200">
                        {/* Sender Info */}
                        <Row className="mb-6">
                            <Column className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                <Text className="text-sm text-gray-600 mb-1 font-medium">
                                    Gönderen:
                                </Text>
                                <Text className="text-lg font-semibold text-gray-800">
                                    {senderEmail}
                                </Text>
                            </Column>
                        </Row>

                        {/* Message */}
                        <Row className="mb-6">
                            <Column>
                                <Text className="text-lg font-semibold text-gray-800 mb-3">
                                    Mesaj:
                                </Text>
                                <Section className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <Text className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {message}
                                    </Text>
                                </Section>
                            </Column>
                        </Row>

                        {/* Divider */}
                        <Hr className="border-gray-200 my-4" />

                        {/* Footer */}
                        <Row className="text-center">
                            <Column>
                                <Text className="text-sm text-gray-500">
                                    Bu mesaj Semih Çavdar'ın portfolio sitesinden gönderilmiştir
                                </Text>
                                <Text className="text-xs text-gray-400 mt-2">
                                    {currentDate}
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
}
