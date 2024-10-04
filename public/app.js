window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector("#renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    let bees = [];  // Declare bees array here, accessible throughout the code

    const scene = createScene();

    // Create the scene
    function createScene() {
        const scene = new BABYLON.Scene(engine);

        // Create a camera that allows zooming in and out
        const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 3, 15, new BABYLON.Vector3(0, 5, 0), scene);
        camera.attachControl(canvas, true);

        // Set camera limits to allow zooming out to reveal the whole forest
        camera.lowerRadiusLimit = 3;   // Close-up view of the bees
        camera.upperRadiusLimit = 100;  // Zoomed-out view of the entire forest

        // Add lighting to the scene
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Create a large tree trunk in front of the bees
        const trunk = BABYLON.MeshBuilder.CreateCylinder("trunk", { height: 20, diameter: 5 }, scene);
        trunk.position = new BABYLON.Vector3(0, 10, 0);  // Tree trunk is at the center
        const trunkMaterial = new BABYLON.StandardMaterial("trunkMaterial", scene);
        trunkMaterial.diffuseColor = new BABYLON.Color3(0.55, 0.27, 0.07);  // Brown color for the trunk
        trunk.material = trunkMaterial;

        // Create bees (spheres) swarming in front of the trunk
        for (let i = 0; i < 50; i++) {
            const bee = BABYLON.MeshBuilder.CreateSphere("bee", { diameter: 0.5 }, scene);
            bee.position = new BABYLON.Vector3(Math.random() * 5 - 2.5, Math.random() * 5 + 5, Math.random() * 5 - 2.5);
            const beeMaterial = new BABYLON.StandardMaterial("beeMaterial", scene);
            beeMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);  // Yellow color for bees
            bee.material = beeMaterial;

            bees.push(bee);  // Add each bee to the bees array
        }

        // Create the surrounding forest (trees)
        for (let i = 0; i < 100; i++) {
            const treeTrunk = BABYLON.MeshBuilder.CreateCylinder("treeTrunk", { height: 20, diameter: 2 }, scene);
            treeTrunk.position = new BABYLON.Vector3(Math.random() * 200 - 100, 10, Math.random() * 200 - 100);
            const treeTrunkMaterial = new BABYLON.StandardMaterial("treeTrunkMaterial", scene);
            treeTrunkMaterial.diffuseColor = new BABYLON.Color3(0.55, 0.27, 0.07);  // Brown for tree trunks
            treeTrunk.material = treeTrunkMaterial;

            const leaves = BABYLON.MeshBuilder.CreateSphere("leaves", { diameter: 6 }, scene);
            leaves.position = new BABYLON.Vector3(treeTrunk.position.x, 16, treeTrunk.position.z);
            const leavesMaterial = new BABYLON.StandardMaterial("leavesMaterial", scene);
            leavesMaterial.diffuseColor = new BABYLON.Color3(0.13, 0.55, 0.13);  // Green for leaves
            leaves.material = leavesMaterial;
        }

        // Skybox (sunny sky)
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        return scene;
    }

    // Animation loop for bees
    scene.onBeforeRenderObservable.add(() => {
        bees.forEach(bee => {
            bee.position.addInPlace(new BABYLON.Vector3(
                (Math.random() - 0.5) * 0.05,  // Small random movement in X
                (Math.random() - 0.5) * 0.05,  // Small random movement in Y
                (Math.random() - 0.5) * 0.05   // Small random movement in Z
            ));
        });
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
});
