// CONFIG SUPABASE

const supabaseUrl = "https://mghceiojyyckvbjubztq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1naGNlaW9qeXlja3ZianVienRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MzczNTksImV4cCI6MjA5NzAxMzM1OX0._t0mUeZtZeRhmaXGhhQHqJKsINyNbBFkj-iU18snfQQ";

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