import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "../../lib/vehicles/ValidatorVehicle";
import { validate, handleChange } from "../../lib/formUtils";
import FormVehicle from "../../components/vehicles/Form";
import consts from "../../consts";

const Update = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const id = useParams().id;

  if (!id) {
    navigate("/listagem");
  }

  function fetchData() {
    axios
      .get(`${consts.API_URL}/veiculo/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setInputs(resp.data);
        } else {
          console.log(resp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  function validateFields(postInputs) {
    validate(postInputs, inputs, setErrors, validator);
  }

  function handleChangeLocal(e) {
    handleChange(e, setInputs, inputs);
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFields(() => {
      axios.put(`${consts.API_URL}/veiculo/${id}`, inputs).then((resp) => {
        if (resp.status == 200) {
          alert("Veiculo alterado com sucesso");
          navigate("/veiculos");
        }
      })
        .catch((resp) => {
          alert(resp.response.data.message);
        });
      console.log("Enviou dados para a API");
    });
  }

  useEffect(() => {
    validateFields();
  }, [inputs]);

  return (
    <>
      <h1>Alteração de Veículo</h1>
      <hr />
      <FormVehicle handleSubmit={handleSubmit} handleChange={handleChangeLocal} inputs={inputs} errors={errors} />
    </>
  );
};

export default Update;
