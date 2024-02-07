import _ from "lodash";

const translateServerErrors = (errors) => {
  return Object.keys(errors).reduce((serializedErrors, key) => {
    const field = _.startCase(key);
    const message = errors[key][0].message;
    return {
      ...serializedErrors,
      [field]: message,
    };
  }, {});
};

export default translateServerErrors;
