// CONFIG SUPABASE

const supabaseUrl = "COLLE_ICI_TON_URL";
const supabaseKey = "COLLE_ICI_TA_CLE";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// BOUTON

const addButton =
  document.getElementById("addSubject");

// CONTENEUR DES MATIÈRES

const subjectsContainer =
  document.getElementById("subjects");
  addButton.addEventListener(
  "click",
  async () => {

    const name =
      prompt("Nom de la matière");

    if (!name) return;

    const { error } =
      await supabaseClient
        .from("subjects")
        .insert([
          {
            name: name
          }
        ]);

    if (error) {
      console.error(error);
      alert("Erreur");
      return;
    }

    loadSubjects();
  }
);
async function loadSubjects() {

  const { data, error } =
    await supabaseClient
      .from("subjects")
      .select("*")
      .order("created_at");

  if (error) {
    console.error(error);
    return;
  }

  subjectsContainer.innerHTML = "";

  data.forEach(subject => {

    const card =
      document.createElement("div");

    card.className =
      "subject-card";

    card.innerHTML = `
      <h3>📚 ${subject.name}</h3>
    `;

    subjectsContainer.appendChild(card);

  });
}
loadSubjects();