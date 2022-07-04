import Vue from "vue";

Vue.filter("formatDate", (date) => {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return newDate.toLocaleDateString("fr-FR", options);
});
