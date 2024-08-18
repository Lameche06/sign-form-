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
  useToast,
  Text,
  Divider
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    address: '',
    telephone: '',
    dateOfBirth: '',
    jobTitle: '',
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      telephone: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    if (!formData.address) newErrors.address = 'L\'adresse est requise';
    if (!formData.telephone) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
    if (!formData.jobTitle) newErrors.jobTitle = 'Le titre du poste est requis';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Appel à l'API avec Axios
        const response = await axios.post(`http://localhost:4500/api/v1/profiles/create`, formData);

        if (response.status === 201) {  // 201 Created
          toast({
            title: "Inscription réussie.",
            description: "Vos informations ont été soumises avec succès.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          // Réinitialiser le formulaire
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            address: '',
            telephone: '',
            dateOfBirth: '',
            jobTitle: '',
          });
          setErrors({});
        }
      } catch (error) {
        // Gérer les erreurs de l'API
        toast({
          title: "Erreur d'inscription.",
          description: error.response?.data?.message || "Une erreur s'est produite lors de l'envoi de vos informations.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
              <FormControl isInvalid={errors.nom}>
                <FormLabel htmlFor="nom">Nom</FormLabel>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
                {errors.nom && <Box color="red.500" mt={2}>{errors.nom}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.prenom}>
                <FormLabel htmlFor="prenom">Prénom</FormLabel>
                <Input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
                {errors.prenom && <Box color="red.500" mt={2}>{errors.prenom}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <Box color="red.500" mt={2}>{errors.email}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.address}>
                <FormLabel htmlFor="address">Adresse</FormLabel>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <Box color="red.500" mt={2}>{errors.address}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.telephone}>
                <FormLabel htmlFor="telephone">Téléphone</FormLabel>
                <PhoneInput
                  country={'cm'} // Default country code
                  value={formData.telephone}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: '100%' }}
                />
                {errors.telephone && <Box color="red.500" mt={2}>{errors.telephone}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.dateOfBirth}>
                <FormLabel htmlFor="dateOfBirth">Date de Naissance</FormLabel>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <Box color="red.500" mt={2}>{errors.dateOfBirth}</Box>}
              </FormControl>

              <FormControl isInvalid={errors.jobTitle}>
                <FormLabel htmlFor="jobTitle">Titre du poste</FormLabel>
                <Input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
                {errors.jobTitle && <Box color="red.500" mt={2}>{errors.jobTitle}</Box>}
              </FormControl>

              <Button type="submit" colorScheme="teal" size="md" mt={4}>
                S'inscrire
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupForm;
