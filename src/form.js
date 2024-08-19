import React, { useState } from 'react';
import axios from 'axios'; // Importer Axios
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
  Divider
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    surname: '',
    email: '',
    location: '',
    telephone: '',
    dateOfBirth: '',
    jobTitle: '',
    language: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // Check if e.target exists to avoid errors
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, telephone: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData:', formData);
    setLoading(true);
    try {
      // Appel à l'API avec Axios
      const response = await axios.post(`http://localhost:4500/api/v1/profiles/create`, formData);

      if (response.status === 201) {
        toast.success("Inscription réussie.\nVos informations ont été soumises avec succès.");

        // Réinitialiser le formulaire
        setFormData({
          userId: '',
          name: '',
          surname: '',
          email: '',
          location: '',
          telephone: '',
          dateOfBirth: '',
          jobTitle: '',
          language: ''
        });
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      console.log(error);
    } finally {
      setLoading(false); // Arrête le chargement
    }

  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={4} bg="gray.50">
      <Box
        bg="white"
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        maxW="lg"
        width="100%"
      >
        <Flex mb={4} align="center" justify="center">
          <Heading as="h2" size="lg" mb={2}>User Information</Heading>
        </Flex>
        <Divider borderColor="teal.500" />
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl >
                <FormLabel htmlFor="userId">Username</FormLabel>
                <Input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </FormControl>

              <FormControl >
                <FormLabel htmlFor="surname">Surname</FormLabel>
                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />

              </FormControl>

              <FormControl >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </FormControl>

              <FormControl >
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />

              </FormControl>

              <FormControl>
                <FormLabel htmlFor="telephone">Phone number</FormLabel>
                <PhoneInput
                  country={'cm'} // Default country code
                  value={formData.telephone}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: '100%' }}
                  containerStyle={{ textAlign: 'left' }}
                  dropdownStyle={{ textAlign: 'left' }}

                />
              </FormControl>

              <FormControl >
                <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl >
                <FormLabel htmlFor="jobTitle">Job title</FormLabel>
                <Input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="language">Language</FormLabel>
                <Input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" colorScheme="teal" size="md" mt={4} isLoading={loading}>
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupForm;
