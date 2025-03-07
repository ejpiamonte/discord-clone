import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
    
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`); // Redirect to the existing server
        
    }

    // Render the "Create a Server" page
    return <div>Create a Server</div>;
};

export default SetupPage;
