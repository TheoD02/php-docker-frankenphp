import {Button, Paper, Stack, Textarea, TextInput} from '@mantine/core';
import {useForm} from '@tanstack/react-form';
import {notifications} from '@mantine/notifications';
import {IconSend} from '@tabler/icons-react';

interface ContactFormValues {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function ContactForm() {
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        } as ContactFormValues,
        onSubmit: async ({value}) => {
            // Mock submission
            console.log('Form submitted:', value);

            notifications.show({
                title: 'Message envoyé !',
                message: 'Nous vous répondrons dans les plus brefs délais.',
                color: 'green',
            });

            form.reset();
        }
    });

    return (
        <Paper shadow="sm" p="xl" radius="md">
            <form onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit();
            }}>
                <Stack gap="md">
                    <form.Field
                        name="name"
                        children={(field) => (
                            <TextInput
                                label="Nom complet"
                                placeholder="Votre nom"
                                required
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        )}
                    />

                    <form.Field
                        name="email"
                        children={(field) => (
                            <TextInput
                                label="Email"
                                placeholder="votre@email.com"
                                required
                                type="email"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        )}
                    />

                    <form.Field
                        name="subject"
                        children={(field) => (
                            <TextInput
                                label="Sujet"
                                placeholder="Objet de votre message"
                                required
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        )}
                    />

                    <form.Field
                        name="message"
                        children={(field) => (
                            <Textarea
                                label="Message"
                                placeholder="Votre message..."
                                required
                                minRows={5}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        leftSection={<IconSend size={20}/>}
                        fullWidth
                    >
                        Envoyer le message
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
